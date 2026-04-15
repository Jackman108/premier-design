type Bucket = {
    count: number;
    resetAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitOptions = {
    windowMs: number;
    maxRequests: number;
};

export type RateLimitResult = {
    allowed: boolean;
    remaining: number;
    retryAfterSec: number;
    limit?: number;
    resetAtUnixSec?: number;
};

export const checkRateLimit = (key: string, options: RateLimitOptions): RateLimitResult => {
    const now = Date.now();
    const existing = buckets.get(key);
    const resetAt = now + options.windowMs;

    if (!existing || existing.resetAt <= now) {
        buckets.set(key, {count: 1, resetAt});
        return {
            allowed: true,
            remaining: options.maxRequests - 1,
            retryAfterSec: Math.ceil(options.windowMs / 1000),
            limit: options.maxRequests,
            resetAtUnixSec: Math.ceil(resetAt / 1000),
        };
    }

    if (existing.count >= options.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
            limit: options.maxRequests,
            resetAtUnixSec: Math.ceil(existing.resetAt / 1000),
        };
    }

    existing.count += 1;
    buckets.set(key, existing);

    return {
        allowed: true,
        remaining: options.maxRequests - existing.count,
        retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
        limit: options.maxRequests,
        resetAtUnixSec: Math.ceil(existing.resetAt / 1000),
    };
};

// Test helper to isolate state between unit tests.
export const resetRateLimitBuckets = (): void => {
    buckets.clear();
};
