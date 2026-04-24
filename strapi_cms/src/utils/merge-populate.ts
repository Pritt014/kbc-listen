type PopulateNode =
  | string
  | boolean
  | null
  | undefined
  | PopulateNode[]
  | { [key: string]: PopulateNode };

const isPlainObject = (value: PopulateNode): value is Record<string, PopulateNode> => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const mergePopulateNode = (
  existing: PopulateNode,
  defaults: PopulateNode
): PopulateNode => {
  if (existing == null) {
    return defaults;
  }

  if (existing === '*' || defaults === '*') {
    return existing;
  }

  if (Array.isArray(existing) || Array.isArray(defaults)) {
    return existing;
  }

  if (!isPlainObject(existing) || !isPlainObject(defaults)) {
    return existing;
  }

  const merged: Record<string, PopulateNode> = { ...defaults };

  for (const [key, value] of Object.entries(existing)) {
    merged[key] = key in defaults ? mergePopulateNode(value, defaults[key]) : value;
  }

  return merged;
};

export const withDefaultPopulate = <
  TQuery extends { populate?: PopulateNode } | undefined,
>(
  query: TQuery,
  defaults: PopulateNode
) => {
  return {
    ...(query ?? {}),
    populate: mergePopulateNode(query?.populate, defaults),
  };
};
