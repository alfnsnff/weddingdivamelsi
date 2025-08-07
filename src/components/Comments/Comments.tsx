import React, { useState, useEffect, useRef } from 'react';
import styles from './Comments.module.css';
import {
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../../../firebase';

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: any;
}

const COMMENTS_PER_PAGE = 5;

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);
  const commentsListHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'wedding-comments'),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData: Comment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(commentsData);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading comments:', error);
      setIsLoading(false);
      const savedComments = localStorage.getItem('wedding-comments');
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setNotification('Mohon isi nama dan ucapan Anda.');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'wedding-comments'), {
        name: formData.name.trim(),
        message: formData.message.trim(),
        timestamp: serverTimestamp()
      });
      setFormData({ name: '', message: '' });
      setNotification('Terima kasih! Ucapan Anda berhasil dikirim.');
      setTimeout(() => setNotification(''), 3000);
      setVisibleCount(COMMENTS_PER_PAGE);
    } catch (error) {
      console.error('Error adding comment:', error);
      const newComment: Comment = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        message: formData.message.trim(),
        timestamp: new Date()
      };
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem('wedding-comments', JSON.stringify(updatedComments));
      setFormData({ name: '', message: '' });
      setNotification('Ucapan berhasil dikirim (disimpan lokal)!');
      setTimeout(() => setNotification(''), 3000);
      setVisibleCount(COMMENTS_PER_PAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return '';
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else {
      date = new Date(timestamp);
    }
    return date.toLocaleString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + COMMENTS_PER_PAGE);
  };

  const handleShowLess = () => {
    setVisibleCount(COMMENTS_PER_PAGE);
    commentsListHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const visibleComments = comments.slice(0, visibleCount);

  if (isLoading) {
    return (
      <section className={styles.commentsSection}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Memuat ucapan...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.commentsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Ucapan & Doa</h2>
          <p className={styles.subtitle}>Berikan ucapan dan doa terbaik untuk kami</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.commentForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Nama</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama Anda"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>Ucapan & Doa</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tulis ucapan dan doa terbaik untuk kami..."
                className={styles.textarea}
                rows={4}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
            {notification && <div className={styles.notification}>{notification}</div>}
          </form>
        </div>

        <div className={styles.sectionHeader} ref={commentsListHeaderRef}>
          <h3 className={styles.title}>
            Ucapan dari Teman & Keluarga
          </h3>
        </div>

        {comments.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.commentCard}>
              <p>Belum ada ucapan. Jadilah yang pertama memberikan ucapan!</p>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.commentsList}>
              {visibleComments.map((comment) => (
                <div key={comment.id} className={styles.commentCard}>
                  <div className={styles.commentHeader}>
                    <div className={styles.commentAuthor}>
                      <span className={styles.authorName}>{comment.name}</span>
                    </div>
                    <span className={styles.commentTime}>
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <div className={styles.commentContent}>
                    <p className={styles.commentMessage}>{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.commentCounts}>
              Terima kasih atas {comments.length} ucapan
            </div>

            <div className={styles.loadMoreContainer}>
              {visibleCount < comments.length && (
                <button onClick={handleLoadMore} className={styles.loadMoreButton}>
                  Tampilkan Lebih Banyak
                </button>
              )}
              {visibleCount > COMMENTS_PER_PAGE && (
                <button onClick={handleShowLess} className={styles.showLessButton}>
                  Tampilkan Lebih Sedikit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Comments;