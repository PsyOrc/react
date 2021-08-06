import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from 'react-dom';
import BookList from './BookList';
import Book from '../../models/Book';
import BookModel from '../../models/Book';

interface Props {
    book: Book;
    onShowDetails: (book: BookModel) => void
}
const container: Props = {
    book: {
        isbn: '9783864906466',
        title: 'Angular',
        authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'],
        published: new Date(2019, 4, 30),
        subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices - mit NativeScript und NgRx',
        rating: 5,
        thumbnails: [{
            url: 'https://ng-buch.de/buch1.jpg',
            title: 'Buchcover'
        }],
        description: 'Die Autoren führen Sie mit einem anspruchsvollen Beispielprojekt durch die Welt von Angular...'
    },
    onShowDetails: () => undefined
};

describe('Test Book List', () => {
    it('book main div is visible', () => {
        render(<BookList onShowDetails={container.onShowDetails} />);
        const divElement = document.getElementsByClassName('ui middle aligned selection divided list')
        expect(divElement).toBeTruthy();
    });
})
