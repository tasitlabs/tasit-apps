import { useEffect, useState } from "react";

import * as Random from "expo-random";

interface RandomBytesResult {
  randomBytes: Uint8Array;
  // isLoading: boolean;
}

export default function useRandomBytes(amount: number): RandomBytesResult {
  const [randomBytes, setRandomBytes] = useState(new Uint8Array());
  // const [isLoading, setIsLoading] = useState(false);
  const randomBytesUndefined = randomBytes.length === 0;

  // console.log({
  //   randomBytes,
  //   // isLoading
  // });

  useEffect(() => {
    let isMounted = true;
    // setIsLoading(true);
    async function makeRandomBytes(): Promise<void> {
      const randomBytesThatWereGenerated = await Random.getRandomBytesAsync(
        amount
      );
      if (isMounted) {
        console.log("randomBytes generated");
        setRandomBytes(randomBytesThatWereGenerated);
        // setIsLoading(false);
      }
    }

    if (randomBytesUndefined) {
      makeRandomBytes();
    }

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, [amount, randomBytesUndefined]); // Just run this once

  return {
    randomBytes,
    // isLoading
  };
}
