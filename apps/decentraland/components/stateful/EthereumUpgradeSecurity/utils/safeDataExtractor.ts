export type OwnerProps = {
  name: string;
  address: string;
};

export type ValuesProps = {
  owners: number;
  confirmations: number;
  name: string;
};

export const getAccountsFrom = (values: ValuesProps): string[] => {
  const accounts = Object.keys(values)
    .sort()
    // \d 	Matches any decimal digit.
    .filter(key => /^owner\d+Address$/.test(key));

  return accounts.map(account => values[account]).slice(0, values.owners);
};

export const getNamesFrom = (values: ValuesProps): string[] => {
  const accounts = Object.keys(values)
    .sort()
    // \d 	Matches any decimal digit.
    .filter(key => /^owner\d+Name$/.test(key));

  return accounts.map(account => values[account]).slice(0, values.owners);
};

export const getOwnersFrom = (
  names: string[],
  addresses: string[]
): OwnerProps[] => {
  const owners = names.map((name: string, index: number) => {
    return { name, address: addresses[index] };
  });

  return owners;
};

export const getThresholdFrom = (values: ValuesProps): number =>
  Number(values.confirmations);

export const getSafeNameFrom = (values: ValuesProps): string => values.name;
