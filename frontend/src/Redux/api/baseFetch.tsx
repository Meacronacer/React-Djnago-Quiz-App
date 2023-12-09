import { BaseQueryFn, FetchArgs, FetchBaseQueryError ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'  
import { setNewAccessToken, logoutUser } from '../slices/authSlice'


const baseQuery = fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api'})
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult:any = await baseQuery({
      url: '/token/refresh/',
      method: 'POST',
      body: {
        refresh: JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '').authSlice).refreshToken
      },
    }, api, extraOptions)

    if (refreshResult.data) {
      // store the new token
      api.dispatch(setNewAccessToken(refreshResult.data))
      // retry the initial query
      args.headers.Authorization = `Bearer ${refreshResult.data.access}`
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logoutUser())
    }

  }
  return result
}