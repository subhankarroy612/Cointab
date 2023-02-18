import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import styles from '../styles/home.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { url } from '../components/url';
import bgcVideo from '../assets/bgcVideo.mp4'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const fetchUsers = async () => {
    if (loading) {
      return toast({
        position: 'top',
        title: 'Error!',
        description: 'Please wait for the previous request to get completed.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

    setLoading(true)
    await axios.get(url + '/fetchUsers').then(() => {
      toast({
        position: 'top',
        title: 'Data saved in database.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }).finally(() => {
      setLoading(false)
    })
  }

  const deleteUsers = async () => {

    setLoadingDelete(true)

    onClose()
    await axios.delete(url + '/fetchUsers').then(() => {
      toast({
        position: 'top',
        title: 'Data deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }).finally(() => setLoadingDelete(false))
  }

  return (
    <div id={styles.home}>

      <video id={styles.homeVideo} src={bgcVideo} autoPlay loop muted />


      <section>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Users</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Clicking on Delete will erase all the data. Are you sure ?
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={deleteUsers} bg={'red'} color='white'>DELETE</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>

      <div id={styles.home_container}>

        <Text color={'white'}>Click on Fetch Users to fetch 50 data</Text>
        <Button
          isLoading={loading}
          loadingText={'Submitting'}
          onClick={fetchUsers}
        >
          Fetch Users
        </Button>

        <Text color={'red'}>Click on Delete Users to delete entire data</Text>
        <Button
          isLoading={loadingDelete}
          loadingText={'Deleting'}
          bg={'red'}
          color={'white'} onClick={onOpen}
        >
          Delete Users
        </Button>

        <Text color={'teal'}>Click on User Details to check details</Text>
        <Button
          bg={'teal'}
          color={'white'}
          onClick={() => { navigate('/userDetails') }}
        >
          User Details
        </Button>

      </div>


    </div>
  )
}

