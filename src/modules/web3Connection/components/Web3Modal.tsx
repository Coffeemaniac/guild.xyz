import { useEffect, useRef } from "react"
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
// eslint-disable-next-line import/no-extraneous-dependencies
import { AbstractConnector } from "@web3-react/abstract-connector"
import MetaMaskOnboarding from "@metamask/onboarding"
import injected from "connectors"
import { Link } from "common/components/Link"
import ConnectionError from "./ConnectionError"

type Props = {
  activatingConnector: AbstractConnector
  setActivatingConnector: (connector: AbstractConnector) => void
  isModalOpen: boolean
  closeModal: () => void
}

const Web3Modal = ({
  activatingConnector,
  setActivatingConnector,
  isModalOpen,
  closeModal,
}: Props): JSX.Element => {
  const { active, activate, error, connector, setError } = useWeb3React()

  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>()
  if (typeof window !== "undefined") {
    onboarding.current = new MetaMaskOnboarding()
  }

  const handleConnect = () => {
    setActivatingConnector(injected)
    activate(injected, undefined, true).catch((err) => {
      setActivatingConnector(undefined)
      setError(err)
    })
  }
  const handleOnboarding = () => onboarding.current?.startOnboarding()

  useEffect(() => {
    if (active) {
      closeModal()
    }
  }, [active, closeModal])

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect to a wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ConnectionError />
          <Stack spacing="4">
            <ConnectorButton
              name={
                typeof window !== "undefined" &&
                MetaMaskOnboarding.isMetaMaskInstalled()
                  ? "MetaMask"
                  : "Install MetaMask"
              }
              onClick={
                typeof window !== "undefined" &&
                MetaMaskOnboarding.isMetaMaskInstalled()
                  ? handleConnect
                  : handleOnboarding
              }
              iconUrl="metamask.png"
              disabled={!!activatingConnector || connector === injected}
              isActive={connector === injected}
              isLoading={activatingConnector && activatingConnector === injected}
            />
            <Button as="p" disabled isFullWidth size="xl">
              More options coming soon
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Text textAlign="center">
            New to Ethereum wallets?{" "}
            <Link
              color="primary.500"
              target="_blank"
              href="https://ethereum.org/en/wallets/"
            >
              Learn more
            </Link>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function ConnectorButton({ name, onClick, iconUrl, disabled, isActive, isLoading }) {
  return (
    <Button
      onClick={onClick}
      rightIcon={<Image src={`walletLogos/${iconUrl}`} h="5" />}
      disabled={disabled}
      isLoading={isLoading}
      spinnerPlacement="end"
      loadingText={`${name} - connecting...`}
      isFullWidth
      size="xl"
      justifyContent="space-between"
      border={isActive && "2px"}
      borderColor="primary.500"
    >
      {`${name} ${isActive ? " - connected" : ""}`}
    </Button>
  )
}

export default Web3Modal