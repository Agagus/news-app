import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import PagesLayout from '@/components/PagesLayout';
import { useEffect, useState } from 'react';

export default function Home({articles}) {
  
  return (
    <PagesLayout title='News App'>
      <div className={styles.container}>
        <h1>Mi news app</h1>
        <Link href='/about'>
          <button>Ir a about</button>
        </Link>

        {articles.length === 0 && <p>Loading...</p> }
        {articles.length  > 0 && articles.map((article, index) => {
            return ( <article className={styles.article} key={index}>
              <Image
                alt={`Image for the article ${index}`}
                src={article.urlToImage}
                width={450}
                height={300}
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </article>)
          })
        }
      </div>
    </PagesLayout>
  );
}

export async function getStaticProps() {

  const response = await fetch(
      'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=fbdf988d36b64df19de549f6ae7ca945'
    )

  const { articles } = await response.json()

  return {
    props: { articles }
  }
}