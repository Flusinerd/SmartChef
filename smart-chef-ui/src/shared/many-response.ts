export interface ManyResponseDTO<DTO>{
    count: number;
    next: string;
    previous: string;
    results: DTO[];
}

