import * as React from "react";

interface InfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  next: () => unknown;
  threshold?: number;
  root?: Element | Document | null;
  rootMargin?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function InfiniteScroll({
  isLoading,
  hasMore,
  next,
  threshold = 1,
  root = null,
  rootMargin = "0px",
  reverse,
  children,
}: InfiniteScrollProps) {
  const observer = React.useRef<IntersectionObserver | null>(null);

  const observerRef = React.useCallback(
    (element: HTMLElement | null) => {
      let safeThreshold = threshold;
      if (threshold < 0 || threshold > 1) {
        console.warn(
          "threshold should be between 0 and 1. You are exceeding the range. Defaulting to 1.",
        );
        safeThreshold = 1;
      }

      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      if (!element) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            next();
          }
        },
        { threshold: safeThreshold, root, rootMargin },
      );

      observer.current.observe(element);
    },
    [hasMore, isLoading, next, threshold, root, rootMargin],
  );

  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const isObserveTarget = reverse ? index === 0 : index === childrenArray.length - 1;

        // Only assign `ref` if the child accepts it (e.g., DOM elements or forwardRef components)
        if (isObserveTarget && typeof child.type !== "string") {
          return child; // Don't attach ref to components that aren't DOM or forwardRef
        }

        return React.cloneElement(child, {
          ...(isObserveTarget ? { ref: observerRef } : {}),
        });
      })}
    </>
  );
}
