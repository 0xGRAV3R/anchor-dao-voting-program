import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Counter } from '../target/types/counter';

describe('counter', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Counter as Program<Counter>;

  const counterKeypair = Keypair.generate();

  it('Initialize Voter', async () => {
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Voter', async () => {
    await program.methods
      .increment()
      .accounts({ counter: counterKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Voter Again', async () => {
    await program.methods
      .increment()
      .accounts({ counter: counterKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Add Voter Point', async () => {
    await program.methods
      .decrement()
      .accounts({ counter: counterKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set vote value', async () => {
    await program.methods
      .set(42)
      .accounts({ counter: counterKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the voter account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        counter: counterKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.counter.fetchNullable(
      counterKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
