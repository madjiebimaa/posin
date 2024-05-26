"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQuery<T>(
  name: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams);

  const query = searchParams.get(name) || defaultValue;

  const setQuery = (value: T) => {
    value
      ? urlSearchParams.set(name, String(value))
      : urlSearchParams.delete(name);

    router.replace(`${pathname}?${urlSearchParams.toString()}`);
  };

  return [query as T, setQuery];
}
