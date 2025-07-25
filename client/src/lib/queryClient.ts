import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | FormData,
): Promise<Response> {
  // 1) 헤더와 바디를 상황에 맞게 초기화
  const headers: Record<string, string> = {};
  let bodyInit: BodyInit | undefined;

  if (data instanceof FormData) {
    // FormData일 때는 Content-Type 헤더를 지정하지 않고
    // body에 그대로 FormData를 넣어줍니다.
    bodyInit = data;
  } else if (data !== undefined) {
    // 일반 객체(JSON)일 때만 Content-Type을 붙이고 stringify
    headers["Content-Type"] = "application/json";
    bodyInit = JSON.stringify(data);
  }

  // 2) fetch 호출에 위에서 준비한 headers/bodyInit 적용
  const res = await fetch(url, {
    method,
    headers,
    body: bodyInit,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}


type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
