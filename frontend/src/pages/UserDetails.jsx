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
} from '@chakra-ui/react';
import styles from '../styles/userdetails.module.css'
import { url } from '../components/url';
import axios from 'axios'



export default function UserDetails() {

  const [data, setData] = useState([])

  useEffect(() => {
    getData().then((r) => setData(r))
  }, []);


  const getData = async () => {
    let res = await axios(url + '/fetchUsers/userdetails');
    return res.data
  }

  return (
    <div id={styles.userdetails}>

      <TableContainer id={styles.user_table}>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                  <Td>  <img src={ele.picture.large} alt='' /> </Td>
                  <Td>{ele.name.title}. {ele.name.first} {ele.name.last}</Td>
                  <Td><Text as={'b'}>{ele.email}</Text></Td>
                  <Td>millimetres (mm)</Td>
                </Tr>
              })
            }
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td>
              {/* <Td isNumeric>25.4</Td> */}
            </Tr>

          </Tbody>

        </Table>
      </TableContainer>

    </div>
  )
}
