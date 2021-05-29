import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  })

  useEffect(() => {
    doRequest()
  }, [])

  return <h1> Signing you out!</h1>
}

export default Signout;