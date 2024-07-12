'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useCounterProgram } from './counter-data-access';
import { CounterCreate, CounterList } from './counter-ui';

export default function CounterFeature() {
  const { publicKey } = useWallet();
  const { programId } = useCounterProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="DAO Voting Program"
        subtitle={
          'Create a new proposal account by clicking the "Create" button. Vote below & the state of a account is stored on-chain and can be manipulated by calling the program\'s methods.'
        }
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <p>
        {/* {`${programId}`} */}
        </p>
        <p>
          
        </p>
        <CounterCreate />
      </AppHero>
      <CounterList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
