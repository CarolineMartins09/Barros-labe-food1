import { Divider, Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";
import { appName, BASE_URL, updateProfile } from "../../constants";
import { useProtectPage } from "../../hooks/useProtectPage";
import { ProfileContainer, UserAddress, UserInfo, UserRequests, userInfoContainer, Spin, Erro} from "./style";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { goToEditAddress, goToEditProfile } from "../../routes/coordinator";




export const ProfilePage = () => {
  useProtectPage();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState({})
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const token = localStorage.getItem("token")
  


const getProfile = () =>{
  axios.get(`${BASE_URL}/${appName}/profile`,
    {
      headers:{
        auth: token
      }
    }).then((response)=>{
      setProfiles(response.data.user);  setIsLoading(!isLoading)
    }).catch((e)=>{
      console.log(e);
    })
  }
  useEffect(() => { getProfile() }, [])
  
const getOrders = () =>{
  axios.get(
    `${BASE_URL}/${appName}/orders/history`,
    {
      headers:{
        auth: token
    }
  }).then((response)=>{
    setOrders(response.data.orders)
    console.log(response);
  }).catch((e)=>{
    console.log(e);
  })
}
useEffect(()=>{getOrders()},[])
  
  
  return (
    
        <ProfileContainer>
          <Stack padding="5" alignItems="center">
              <h2>Meu perfil</h2>
          </Stack>
        <Divider/>

          <UserInfo>
            <section>
              <h1>{profiles && profiles.name}</h1>
              <h3>{profiles && profiles.email}</h3>
              <h3>{profiles && profiles.cpf}</h3>
            </section>
            <button onClick={()=>goToEditProfile(navigate)}>
              <MdEdit />
            </button>
          </UserInfo>
        
        <UserAddress>
          <div>
            <p>Endereço cadastrado</p>
            <h3>{profiles && profiles.address}</h3>
          </div>
            <button onClick={()=>goToEditAddress(navigate)}>
              <MdEdit />
            </button>
        </UserAddress>
        <UserRequests>
          <h2>Histórico de pedidos</h2>
        <Divider width="90vw" borderColor="black" />
        <section>
        {!isLoading && orders.length === 0 && <Erro>Você não realizou nenhum pedido </Erro>}
        {isLoading && <Spin />}
        </section>
        </UserRequests>
        <Footer />
        </ProfileContainer>

)
};





  






