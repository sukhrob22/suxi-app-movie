import { log } from 'console';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { Header, Hero, Row } from 'src/components';
import { IMovie } from 'src/interfaces/app.interface';
import { API_REQUEST } from 'src/services/api.service';

export default function Home({ trending, topRated, tvTopRated, popular, documentary, comedy, family, histroy }: HomeProps): JSX.Element {
    // console.log(trending[0].title );

    // useEffect(() => {
    //     fetch(API_REQUEST.trending)
    //         .then((res) => res.json())
    //         .then((data) => console.log(data));
    // }, []);

    console.log(topRated);

    return (
        <div className='relative min-h-screen'>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/logo.svg ' />
            </Head>
            <Header />
            <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
                <Hero trending={trending} />
                <section>
                    <Row title='Top Rataed' movies={topRated} />
                    <Row title='Tv Show' movies={tvTopRated} isBig={true} />
                    <Row title='Popular' movies={popular} />
                    <Row title='Documentary' movies={documentary.reverse()} isBig={true} />
                    <Row title='comedy' movies={comedy} />
                    <Row title='Family' movies={family.reverse()} isBig={true} />
                    <Row title='Histroy' movies={histroy} />
                </section>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const trending = await fetch(API_REQUEST.trending).then((res) => res.json());
    const topRated = await fetch(API_REQUEST.top_rated).then((res) => res.json())
    const tvTopRated = await fetch(API_REQUEST.tv_top_rated).then((res) => res.json())
    const popular = await fetch(API_REQUEST.popular).then((res) => res.json())
    const documentary = await fetch(API_REQUEST.documentary).then((res) => res.json())
    const comedy = await fetch(API_REQUEST.comedy).then((res) => res.json())
    const family = await fetch(API_REQUEST.family).then((res) => res.json())
    const histroy = await fetch(API_REQUEST.histroy).then((res) => res.json())

    return {
        props: {
            trending: trending.results,
            topRated: topRated.results,
            tvTopRated: tvTopRated.results,
            popular: popular.results,
            documentary: documentary.results,
            comedy: comedy.results,
            family: family.results,
            histroy: histroy.results,
        },
    };
};

interface HomeProps {
    trending: IMovie[];
    topRated: IMovie[]
    tvTopRated: IMovie[]
    popular: IMovie[]
    documentary: IMovie[]
    comedy: IMovie[]
    family: IMovie[]
    histroy: IMovie[]
}