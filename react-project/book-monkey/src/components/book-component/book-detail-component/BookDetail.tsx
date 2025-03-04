import { Popconfirm } from 'antd'
import React, { ReactElement } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { bookApi, useBookApi } from '../../../hooks/BookApi'
import BookModel from '../../../shared/BookModel'
import { useStore } from '../../../Store'
import LoadingSpinner from '../../loading-spinner/LoadingSpinner'
import './BookDetail.css'



export default function BookDetail(): ReactElement {
    const { id } = useParams<{ id: string }>()
    const history = useHistory()
    const [book] = useBookApi<BookModel>('GET', `/books/${id}`)
    const { store, dispatch } = useStore()

    if (!book) { return <LoadingSpinner message={`Buch ${id}`} /> }

    const onGoToEdit = () => history.push(`/books/${id}/edit`)
    const onGoToList = () => history.push('/books')
    const onDelete = () => bookApi('DELETE', `/books/${id}`, onGoToList)

    const onAddToShoppingCard = () => {
        dispatch({ type: 'ADD_TO_CARD', book })
    }

    return (
        <div className='ui raised padded container segment'>
            <h1>{book.title}</h1>
            <h3>{book.subtitle}</h3>
            <div className="ui divider"></div>
            <div className='ui grid'>
                <div className="four wide column">
                    <h4>Authoren</h4>
                    {book.authors
                        .map((author, index) => <p key={index} >{author}</p>)}
                </div>
                <div className="four wide column">
                    <h4>ISBN</h4>
                    {book.isbn}
                </div>
                <div className="four wide column">
                    <h4>Erschienen</h4>
                    {book.published.toLocaleDateString()}
                </div>
                <div className="four wide column">
                    <h4>Rating</h4>
                    {new Array(book.rating)
                        .fill(true)
                        .map((number, index) => <i key={index} className='yellow star icon' />
                        )}
                </div>
            </div>
            <h4 style={{ marginTop: 20 }}>Beschreibung</h4>
            <p>{book.description}</p>
            <div className="ui small images">
                {book.thumbnails && book.thumbnails.length > 0
                    ? book.thumbnails
                        .map((thrumbnail, index) => <img key={index} alt={book.title} src={thrumbnail.url} />)
                    : false}
            </div>
            <button onClick={onGoToList} className='ui button' >zurück</button>
            <button onClick={onGoToEdit} className='ui button yellow' >Bearbeiten</button>
            <button onClick={onAddToShoppingCard} className='ui button green' >In den Warenkorb</button>
            <Popconfirm
                title="Möchtest du dieses Buch wirklich löschen?"
                onConfirm={onDelete}
                okText="Ja"
                cancelText="Nein"
            >
                <button className='ui button red' >Buch Löschen!</button>
            </Popconfirm>
        </div>
    )
}
