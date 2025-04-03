import { useState, useEffect } from 'react';

type FavoritePet = {
    id: string;
    name: string;
    photoURL: string;
    breed: string;
};

export function useFavorites() {
    const [favorites, setFavorites] = useState<FavoritePet[]>([]);

    // Load favorites từ localStorage khi component mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem('pet-favorites');
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (error) {
                console.error('Error parsing favorites from localStorage:', error);
                localStorage.removeItem('pet-favorites');
            }
        }
    }, []);

    // Kiểm tra xem một thú cưng có trong danh sách yêu thích không
    const isFavorite = (id: string): boolean => {
        return favorites.some(fav => fav.id === id);
    };

    // Thêm hoặc xóa thú cưng khỏi danh sách yêu thích
    const toggleFavorite = (pet: FavoritePet): void => {
        let newFavorites: FavoritePet[];

        if (isFavorite(pet.id)) {
            // Xóa khỏi danh sách yêu thích
            newFavorites = favorites.filter(fav => fav.id !== pet.id);
        } else {
            // Thêm vào danh sách yêu thích
            newFavorites = [...favorites, pet];
        }

        // Cập nhật state và localStorage
        setFavorites(newFavorites);
        localStorage.setItem('pet-favorites', JSON.stringify(newFavorites));
    };

    return { favorites, isFavorite, toggleFavorite };
}
