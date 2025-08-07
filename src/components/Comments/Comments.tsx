import React, { useState, useEffect } from 'react';
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

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load comments dari Firestore dengan real-time updates
  useEffect(() => {
    const q = query(
      collection(db, 'wedding-comments'), 
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData: Comment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({
          id: doc.id,
          ...doc.data()
        } as Comment);
      });
      setComments(commentsData);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading comments:', error);
      setIsLoading(false);
      
      // Fallback ke localStorage jika Firestore gagal
      const savedComments = localStorage.getItem('wedding-comments');
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Mohon isi nama dan ucapan Anda');
      return;
    }

    setIsSubmitting(true);

    try {
      // Add to Firestore
      await addDoc(collection(db, 'wedding-comments'), {
        name: formData.name.trim(),
        message: formData.message.trim(),
        timestamp: serverTimestamp()
      });

      // Reset form
      setFormData({
        name: '',
        message: '',
      });

      alert('Ucapan berhasil dikirim!');
    } catch (error) {
      console.error('Error adding comment:', error);
      
      // Fallback ke localStorage jika Firestore gagal
      const newComment: Comment = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        message: formData.message.trim(),
        timestamp: new Date()
      };

      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem('wedding-comments', JSON.stringify(updatedComments));
      
      setFormData({
        name: '',
        message: '',
      });

      alert('Ucapan berhasil dikirim (disimpan lokal)!');
    } finally {
      setIsSubmitting(false);
    }
  };


  // Format timestamp
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return '';
    
    let date;
    if (timestamp.toDate) {
      // Firestore Timestamp
      date = timestamp.toDate();
    } else {
      // Regular Date
      date = new Date(timestamp);
    }
    
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

        {/* Form untuk menulis ucapan */}
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

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </form>
        </div>

        {/* Display comments */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.title}>
            Ucapan dari Teman & Keluarga 
          </h3>
          
          {comments.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.commentCard}>
              <p>Belum ada ucapan. Jadilah yang pertama memberikan ucapan!</p>
            </div>
            </div>
          ) : (
            <div className={styles.commentsList}>
              {comments.map((comment) => (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Comments;