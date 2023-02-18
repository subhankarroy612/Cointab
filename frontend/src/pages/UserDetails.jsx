import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Button,
  Skeleton,
  Stack,
  Flex,
  Select,
} from '@chakra-ui/react';
import styles from '../styles/userdetails.module.css'
import { url } from '../components/url';
import axios from 'axios'
import { RxThickArrowLeft, RxThickArrowRight } from 'react-icons/rx'
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'


export default function UserDetails() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState('')

  useEffect(() => {

    const getData = async (page = 1, filter = gender) => {
      setLoading(true)
      try {
        let res = await axios(url + '/fetchUsers/userdetails?page=' + page + '&filter=' + filter);
        return res.data
      } catch (e) {
        console.log(e.message);
      }
    }

    getData(page)
      .then((r) => setData(r))
      .finally(() => setLoading(false))
  }, [page, gender]);

  const handlePage = (v) => {
    setPage(page + v)
  }

  const handleGender = async (v, page = 1) => {
    setGender(v)
    setPage(1)
    let res = await axios(url + '/fetchUsers/userdetails?page=' + page + '&filter=' + v);
    setData(res.data)
  }

  return (
    <div id={styles.userdetails}>

      <Flex justifyContent={'flex-end'} padding='20px'>
        <Link to={'/'}>
          <Button className={styles.backBtn}
            transition='1s'
            position={'relative'}
            right='0'
            bg={'red'}
            color='white'>
            <IoIosArrowRoundBack fontSize={'40px'} />Go Back
          </Button>
        </Link>
      </Flex>

      <section id={styles.functionalities}>

        <Flex justifyContent={'space-between'}>
          <Button isDisabled={page === 1} bg={'teal'} onClick={() => handlePage(-1)}>
            <RxThickArrowLeft color='white' fontSize={'40px'} />
          </Button>

          <Text as={'i'} fontSize={'2xl'}>Page: {page}</Text>

          <Button isDisabled={Math.ceil(data.length / 2) - 1 <= 1} bg={'teal'} onClick={() => handlePage(1)}>
            <RxThickArrowRight color='white' fontSize={'40px'} />
          </Button>
        </Flex>

        <Select onChange={(e) => handleGender(e.target.value)} placeholder='Filter by gender'>
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </Select>

      </section>


      <TableContainer className={styles.user_table}>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Picture</Th>
              <Th>Gender</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Country</Th>
            </Tr>
          </Thead>
          <Tbody>



            {
              data && !loading && data.map((ele, i) => {
                return <Tr key={i}>
                  <Td>  <Image borderRadius={'8px'} src={ele.picture.large} alt='' /> </Td>
                  <Td><Text as={'b'}>{ele.gender}</Text></Td>
                  <Td><Text as={'b'}>{ele.name.title}. {ele.name.first} {ele.name.last}</Text></Td>
                  <Td><Text as={'b'}>{ele.email}</Text></Td>
                  <Td><Text as={'b'}>{ele.location.country}</Text></Td>
                </Tr>
              })
            }
          </Tbody>
        </Table>
      </TableContainer>

      {
        !data.length && <Text as={'b'} fontSize={'3xl'}>No users found ( Please Fetch users to see data ! )</Text>
      }

      {
        loading && <Stack className={styles.user_table}>
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
        </Stack>
      }


    </div>
  )
}
