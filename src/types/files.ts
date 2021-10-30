export type FileType = 'video' | 'image'

export interface Media{
    _id: string
    name: string
    url: string
    fileType: FileType
}