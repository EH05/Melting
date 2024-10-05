import {
  ApiResponse,
  createApi,
  createAxiosInstance,
  CustomError,
} from '@/apis/axiosInstance.ts'
import {
  CreateAicoverSongData,
  CreateAicoverSongError,
  GetSongsForAlbumCreationData,
  GetSongsForAlbumCreationError,
  SongSearchPageResponseDto,
} from '@/types/song.ts'
import { ApiResponseBoolean } from '@/types/user'

const instance = createAxiosInstance('songs')
const api = createApi<ApiResponse>(instance)

export const songApi = {
  meltingApi: async (
    originalSongId: number, // 원곡 ID
    voiceBlob: Blob,
  ): Promise<boolean | any> => {
    try {
      // FormData 생성
      const formData = new FormData()
      formData.append('originalSongId', String(originalSongId)) // songId 추가
      formData.append('voiceFile', voiceBlob, 'voiceFile.webm') // voiceFile 추가

      const response = await api.post('/melting', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // multipart 설정
        },
      })

      return response.data
    } catch (error) {
      throw error as CustomError
    }
  },
  getSongsForAlbumCreation: async (
    keyword: string | null,
    page?: number,
    size?: number,
  ): Promise<SongSearchPageResponseDto> => {
    try {
      const response = await api.get<GetSongsForAlbumCreationData>('', {
        params: {
          keyword,
          page,
          size,
        },
      })
      return response.data as SongSearchPageResponseDto
    } catch (error) {
      console.error('Failed to fetch songs for album creation:', error)
      throw error as GetSongsForAlbumCreationError
    }
  },
  aiCover: async (originalSongId: number): Promise<ApiResponseBoolean> => {
    console.log(originalSongId)

    try {
      const response = await api.post<CreateAicoverSongData>('/aicover', {
        originalSongId,
      })
      return response.data as ApiResponseBoolean
    } catch (error) {
      console.error('Failed to fetch songs for album creation:', error)
      throw error as CreateAicoverSongError
    }
  },
}
