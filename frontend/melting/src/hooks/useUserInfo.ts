import { useQuery } from '@tanstack/react-query'
import { userApi } from '@/apis/userApi.ts'
import { GetMemberInfoData, GetMemberInfoError } from '@/types/user'

export const useUserInfo = () => {
  return useQuery<GetMemberInfoData, GetMemberInfoError>({
    queryKey: ['userInfo'], // query key
    queryFn: userApi.getMemberInfo, // fetch function
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
  })
}
