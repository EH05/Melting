import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAlbumContext } from '@/contexts/AlbumContext'
import { Button } from '@/components/ui/button'
import SubmitButton from '../Button/SubmitButton'
import { genres, GenreType } from '@/types/constType'

export default function GenreSelection() {
  const { selectedGenres, setSelectedGenres } = useAlbumContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const initialGenres: GenreType[] = location.state?.initialGenres || []
    setSelectedGenres(initialGenres)
  }, [location.state])

  const toggleGenre = (genre: GenreType) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre)
      } else if (prev.length < 3) {
        return [...prev, genre]
      } else {
        return prev
      }
    })
  }

  const handleSubmit = () => {
    navigate('/album/create', { state: { selectedGenres } })
  }
  return (
    <div className="flex flex-col justify-between flex-1 p-4">
      <div className="">
        <h1 className="tenxt-2xl font-bold mb-4">장르</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenres.includes(genre) ? 'default' : 'tag'}
              onClick={() => toggleGenre(genre as GenreType)}
              className={`rounded-full ${
                selectedGenres.includes(genre)
                  ? 'bg-primary-400 text-white' // 선택된 경우 배경은 primary, 글씨는 흰색
                  : 'text-primary-400'
              }
              `}
              disabled={
                !selectedGenres.includes(genre) && selectedGenres.length >= 3
              }
            >
              #{genre}
            </Button>
          ))}
        </div>
        <p className="text-sm text-primary-500 mb-4">
          ※ 장르는 최소 1개에서 최대 3개까지 등록할 수 있습니다.
        </p>
      </div>
      <SubmitButton
        conditions={[selectedGenres.length > 0]}
        text="장르 등록하기"
        onClick={handleSubmit}
      />
    </div>
  )
}
