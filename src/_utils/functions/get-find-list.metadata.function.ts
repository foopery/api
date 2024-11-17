export function getFindListMetadata(data: { page: number; take: number }, totalCount: number | { count: bigint }[]) {
    if (totalCount instanceof Array) {
        if (totalCount.length !== 0) {
            totalCount = Number(totalCount[0]['count']) as number;
        } else {
            totalCount = 0 as number;
        }
    }

    return {
        currentPage: data.page || null,
        currentTake: data.take || null,
        totalPage: totalCount && data.take ? Math.ceil(totalCount / data.take) : null,
        totalCount,
    };
}
