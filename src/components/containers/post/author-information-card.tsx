import React from 'react';

interface PROPS {
  author: string;
  email: string;
  gender: string;
  status: string;
}
export const AuthorInformationCard = ({
  author,
  email,
  gender,
  status,
}: PROPS) => {
  return (
    <div>
      <p>
        Name: <span className="font-medium capitalize">{author}</span>
      </p>
      <p>
        Email:{' '}
        <a
          className="font-medium border-dotted border-b border-zinc-900"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      </p>
      <p>
        Gender: <span className="font-medium capitalize">{gender}</span>
      </p>
      <p>
        Status: <span className="font-medium capitalize">{status}</span>
      </p>
    </div>
  );
};
