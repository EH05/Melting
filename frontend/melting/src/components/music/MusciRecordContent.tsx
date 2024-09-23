import { Mic, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { useNavigate } from 'react-router-dom'

interface MusciRecordProps {
  lyrics: string
  audioSrc: string
}

export default function MusciRecordContent({
  lyrics,
  audioSrc,
}: MusciRecordProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isEnd, setIsEnd] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const isMountedRef = useRef(true)
  const chunksRef = useRef<Blob[]>([])
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null)
  const navigate = useNavigate()

  const stopMicrophoneUsage = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsRecording(false)
  }, [])

  const processRecordedAudio = useCallback(() => {
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    setRecordedAudioBlob(blob)
    console.log('Recorded audio file size:', blob.size, 'bytes')
    console.log('Recorded audio file type:', blob.type)
  }, [])

  const resetRecording = useCallback(() => {
    stopMicrophoneUsage()
    setRecordedAudioBlob(null)
    setIsEnd(false)
    setIsPlaying(false)
    setCurrentTime(0)
    chunksRef.current = []
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.pause()
    }
  }, [stopMicrophoneUsage])

  const handleCancel = useCallback(() => {
    resetRecording()
    navigate('/music/list', { state: { type: 'melting' } })
  }, [navigate, resetRecording])

  const startRecording = useCallback(async () => {
    try {
      resetRecording()
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      streamRef.current = stream
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        processRecordedAudio()
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } catch (err) {
      console.error('Error accessing the microphone', err)
    }
  }, [resetRecording, processRecordedAudio])

  const handleRecordClick = useCallback(() => {
    if (isRecording || isEnd) {
      resetRecording()
    } else {
      startRecording()
    }
  }, [isRecording, isEnd, resetRecording, startRecording])

  const lyricsLines = lyrics.split('\n')

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleLoadedMetadata = () => {
        if (isMountedRef.current) setDuration(audio.duration)
      }
      const handleTimeUpdate = () => {
        if (isMountedRef.current) setCurrentTime(audio.currentTime)
      }
      const handlePlay = () => {
        if (isMountedRef.current) setIsPlaying(true)
      }
      const handlePause = () => {
        if (isMountedRef.current) setIsPlaying(false)
      }
      const handleEnded = () => {
        if (isMountedRef.current) {
          setIsEnd(true)
          setIsPlaying(false)
          stopMicrophoneUsage()
          processRecordedAudio()
        }
      }

      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)

      return () => {
        isMountedRef.current = false
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        resetRecording()
      }
    }
  }, [stopMicrophoneUsage, processRecordedAudio, resetRecording])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (Number(e.target.value) / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow">
        <div className="px-4 py-2">
          {lyricsLines.map((line, index) => (
            <div key={index} className="text-[#A5A5A5] text-center my-1">
              {line}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="text-center pb-5 pt-10">
        <Button
          variant="outline"
          size="icon"
          className="w-20 h-20 bg-[#FFAF25] rounded-full"
          onClick={handleRecordClick}
        >
          {isRecording || isEnd ? (
            <RotateCcw className="w-full h-full p-5 text-white" />
          ) : (
            <Mic className="w-full h-full p-5 text-white" />
          )}
        </Button>
      </div>
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer progress-bg-orange"
          style={{
            background: `linear-gradient(to right, #FFB74D 0%, #FFB74D ${
              (currentTime / duration) * 100
            }%, #FFF3DF ${(currentTime / duration) * 100}%, #FFF3DF 100%)`,
          }}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={audioSrc} />

      <div className="text-center">
        <Button
          className={`w-full rounded-full font-bold py-7 text-white ${
            !isRecording && !isEnd
              ? 'bg-[#A5A5A5]'
              : isEnd
                ? 'bg-[#FFAF25]'
                : 'bg-[#A5A5A5]'
          }`}
          onClick={isEnd && !isRecording ? handleCancel : undefined}
          disabled={isEnd && !isRecording ? false : true}
        >
          {!isRecording && !isEnd ? '녹음 시작' : isEnd ? '완료' : '녹음 중'}
        </Button>
        <span className="inline-block pt-3 text-center" onClick={handleCancel}>
          취소
        </span>
      </div>
    </div>
  )
}
