export class TopicPartitionDTO {
    constructor(
        public partition: number,
        public totalMessages: number,
        public startOffset: number,
        public endOffset: number
    ) { }
}