import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

import { Song } from '@/types/song'
import { GenreType } from '@/types/constType'

interface AlbumContextType {
  albumName: string
  setAlbumName: (name: string) => void
  albumIntro: string
  setAlbumIntro: (intro: string) => void
  selectedSongs: Song[]
  setSelectedSongs: (songs: Song[]) => void
  titleSongIndex: number | null
  setTitleSongIndex: (index: number | null) => void
  selectedGenres: GenreType[]
  setSelectedGenres: (
    genres: GenreType[] | ((prev: GenreType[]) => GenreType[]),
  ) => void
  selectedHashtags: string[]
  setSelectedHashtags: (hashtags: string[]) => void
  selectedCover: string | null
  setSelectedCover: (cover: string | null) => void
}

// 기본값은 null이 아닌 적절한 기본 상태를 설정하거나 undefined로 설정
const AlbumContext = createContext<AlbumContextType | undefined>(undefined)

export const useAlbumContext = () => {
  const context = useContext(AlbumContext)
  if (context === undefined) {
    throw new Error('useAlbumContext must be used within an AlbumProvider')
  }
  return context
}

interface AlbumProviderProps {
  children: ReactNode
}

export const AlbumProvider = ({ children }: AlbumProviderProps) => {
  const [albumName, setAlbumName] = useState('')
  const [albumIntro, setAlbumIntro] = useState('')
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])
  const [titleSongIndex, setTitleSongIndex] = useState<number | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [selectedCover, setSelectedCover] = useState<string | null>(null)

  useEffect(() => {
    if (selectedSongs.length > 0 && titleSongIndex === null) {
      setTitleSongIndex(selectedSongs[0].songId) // 첫 번째 곡의 songId로 설정, 오직 titleSongIndex가 null일 때만
    } else if (selectedSongs.length === 0) {
      setTitleSongIndex(null) // 곡이 없으면 null로 설정
    }
  }, [selectedSongs, titleSongIndex])

  return (
    <AlbumContext.Provider
      value={{
        albumName,
        setAlbumName,
        albumIntro,
        setAlbumIntro,
        selectedSongs,
        setSelectedSongs,
        titleSongIndex,
        setTitleSongIndex,
        selectedGenres,
        setSelectedGenres,
        selectedHashtags,
        setSelectedHashtags,
        selectedCover,
        setSelectedCover,
      }}
    >
      {children}
    </AlbumContext.Provider>
  )
}
