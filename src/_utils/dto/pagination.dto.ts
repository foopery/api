import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationDto {
    /** 요청할 페이지 | 최소 1 */
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    page!: number;

    /** 요청할 데이터 수 | 최소 1 | 최대 100 */
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(100)
    take!: number;
}
