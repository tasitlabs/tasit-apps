import { useEffect, useState } from "react";

import * as Random from "expo-random";

interface RandomBytesResult {
  randomBytes: Uint8Array;
  isLoading: boolean;
}

export default function useRandomBytes(amount: number): RandomBytesResult {
  const [randomBytes, setRandomBytes] = useState(new Uint8Array());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    async function makeRandomBytes() {
      const randomBytesThatWereGenerated = await Random.getRandomBytesAsync(
        amount
      );
      setIsLoading(false);
      if (isMounted) {
        console.log("randomBytes generated");
        setRandomBytes(randomBytesThatWereGenerated);
      }
    }
    makeRandomBytes();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, [amount]); // Just run this once

  return { randomBytes, isLoading };
}
