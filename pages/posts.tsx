import React from 'react';

import Link from 'next/link';
import Router from 'next/router';

export default function Posts() {
  return (
    <>
      <div>Posts</div>
      <button type="button" onClick={() => Router.push('/')}>
        Go to main
      </button>
      <p>
        <Link href="/post/1">Post1</Link>
      </p>
      <p>
        <Link href="/post/2">Post2</Link>
      </p>
      <p>
        <Link href="/post/3">Post3</Link>
      </p>
    </>
  );
}
