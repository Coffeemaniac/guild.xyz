import {
  FormControl,
  FormErrorMessage,
  StackDivider,
  useColorMode,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react"
import { DiscordLogo, TelegramLogo } from "phosphor-react"
import { useController, useFormContext } from "react-hook-form"
import CustomDiscord from "./components/CustomDiscord"
import OfficialDiscord from "./components/OfficialDiscord"
import PlatformOption from "./components/PlatformOption"

// const options = ["TELEGRAM", "DISCORD", "CUSTOM_DISCORD"]
const options = [
  {
    value: "TELEGRAM",
    color: "TELEGRAM",
    title: "Telegram",
    description: "Will create a Telegram group for your guild",
    icon: TelegramLogo,
    disabled: true,
  },
  {
    value: "DISCORD",
    color: "DISCORD",
    title: "Official Guild.xyz Discord",
    description:
      "Will create a channel and role on the Guild.xyz server for your guild",
    icon: DiscordLogo,
    disabled: false,
    children: <OfficialDiscord />,
  },
  {
    value: "DISCORD_CUSTOM",
    color: "DISCORD",
    title: "Custom Discord",
    description: "Will create a channel and role on your own server",
    icon: DiscordLogo,
    disabled: false,
    children: <CustomDiscord />,
  },
]

const PickGuildPlatform = () => {
  const { colorMode } = useColorMode()
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { field } = useController({
    control,
    name: "platform",
    rules: { required: "You must pick a realm for your guild" },
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "platform",
    onChange: field.onChange,
    value: field.value,
  })

  const group = getRootProps()

  return (
    <FormControl isRequired isInvalid={errors?.platform}>
      <VStack
        {...group}
        borderRadius="xl"
        bg={colorMode === "light" ? "white" : "blackAlpha.300"}
        spacing="0"
        border="1px"
        borderColor={colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300"}
        divider={<StackDivider />}
      >
        {options.map((option) => {
          const radio = getRadioProps({ value: option.value })
          return <PlatformOption key={option.value} {...radio} {...option} />
        })}
      </VStack>

      <FormErrorMessage>{errors?.platform?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default PickGuildPlatform
