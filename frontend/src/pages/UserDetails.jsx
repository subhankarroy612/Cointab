import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';
import styles from '../styles/userdetails.module.css'
import { url } from '../components/url';
import axios from 'axios'
import { RxThickArrowLeft, RxThickArrowRight } from 'react-icons/rx'


export default function UserDetails() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    getData(page).then((r) => setData(r))
  }, [page]);


  const getData = async (page = 1) => {
    let res = await axios(url + '/fetchUsers/userdetails?page=' + page);
    return res.data
  }

  const handlePage = (v) => {
    setPage(page + v)
  }

  console.log(page)

  return (
    <div id={styles.userdetails}>

      <section id={styles.functionalities}>
        <Button isDisabled={page === 1} bg={'teal'} onClick={() => handlePage(-1)}>
          <RxThickArrowLeft color='white' fontSize={'40px'} />
        </Button>
        <Text as={'i'} fontSize={'2xl'}>Page: {page}</Text>
        <Button bg={'teal'} onClick={() => handlePage(1)}>
          <RxThickArrowRight color='white' fontSize={'40px'} />
        </Button>
      </section>

      <TableContainer id={styles.user_table}>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>User details</TableCaption>
          <Thead>
            <Tr>
              <Th>Picture</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Country</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              data && data.map((ele, i) => {
                return <Tr key={i}>
                  <Td>  <Image borderRadius={'8px'} src={ele.picture.large} alt='' /> </Td>
                  <Td><Text as={'b'}>{ele.name.title}. {ele.name.first} {ele.name.last}</Text></Td>
                  <Td><Text as={'b'}>{ele.email}</Text></Td>
                  <Td><Text as={'b'}>{ele.location.country}</Text></Td>
                </Tr>
              })
            }


          </Tbody>

        </Table>
      </TableContainer>

    </div>
  )
}
