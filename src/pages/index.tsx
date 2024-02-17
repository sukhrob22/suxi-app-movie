import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { Header } from 'src/components';
import { API_REQUEST } from 'src/services/api.service';

export default function Home(props: HomeProps): JSX.Element {
    console.log(props);

    // useEffect(() => {
    //     fetch(API_REQUEST.trending)
    //         .then((res) => res.json())
    //         .then((data) => console.log(data));
    // }, []);

    return (
        <div className='relative h-[200vh]'>
            <Head>
                <title>Create Next App</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/logo.svg ' />
            </Head>
            <Header />
            <main></main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const trending = await fetch(API_REQUEST.trending).then((res) =>
        res.json()
    );

    return {
        props: {
            trending,
        },
    };
};

interface HomeProps {
    trending: any;
}
