import Actives from '../Actives/Actives';
import Nft from '../Nft/Nft';
import { useDispatch, useSelector } from 'react-redux';
import './dashboard.css';
import { useEffect } from 'react';
import { cleanUsersOrders, getOrdersUsers } from '../../Redux/Actions/actions';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const usersOrders = useSelector((state) => state.usersOrders);
  

  const name = userInfo.user.nameCompany || `${userInfo.user.name} ${userInfo.user.last || ''}`.trim();
  const newOrders = usersOrders.filter(order => order.isPaid === true && order.isDelivered === false).length;

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
   
    dispatch(getOrdersUsers({ headers }))
     
    return () => {
      dispatch(cleanUsersOrders());
    };
  }, [dispatch, userInfo]);
  return (
    <div className="main-content d-flex flex-column gap-3 ">
      <Nft name={name} newOrders={newOrders}/>
      <Actives />
    </div>
  );
};
