import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default getStaticProps;