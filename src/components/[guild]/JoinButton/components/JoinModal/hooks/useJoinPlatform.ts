import usePersonalSign from "hooks/usePersonalSign"
import useSubmit from "hooks/useSubmit"
import { mutate } from "swr"
import { PlatformName } from "temporaryData/types"

type Response = {
  inviteLink: string
  alreadyJoined?: boolean
}

const useJoinPlatform = (
  platform: PlatformName,
  platformUserId: string,
  guildId: number
) => {
  const { addressSignedMessage } = usePersonalSign()

  const submit = (): Promise<Response> =>
    fetch(`${process.env.NEXT_PUBLIC_API}/user/joinPlatform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platform,
        guildId: guildId,
        addressSignedMessage,
        platformUserId,
      }),
    }).then((response) => (response.ok ? response.json() : Promise.reject(response)))

  return useSubmit<any, Response>(submit, {
    // revalidating the address list in the AccountModal component
    onSuccess: () => mutate(`/user/${addressSignedMessage}`),
  })
}

export default useJoinPlatform
