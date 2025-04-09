"use client";
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import CardNews from '@/components/blog/CardNews';
import { getCategories } from '@/services/category';
import { getBlogs } from '@/services/blog';
import { Category } from '@/types/category';
import { Blog } from '@/types/blog';

const BlogList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData.data);

                const blogsData = await getBlogs();
                setBlogs(blogsData.data.posts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Lọc các blog có publishedAt hợp lệ
    const validBlogs = blogs.filter(blog => !isNaN(new Date(blog.publishedAt).getTime()));
    // Sắp xếp blog
    const sortedBlogs = [...validBlogs].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return (
        <div className='my-4 md:my-6'>
            <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col justify-between gap-4 md:mb-0 md:flex-row md:items-center md:gap-0">
                    <TabsList className="grid h-fit w-full grid-cols-2 gap-2 md:w-fit md:grid-cols-5">
                        <TabsTrigger value="all" className="whitespace-nowrap text-xs md:w-full md:text-sm">
                            Tất cả
                        </TabsTrigger>
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.name}
                                className="whitespace-nowrap text-xs md:w-full md:text-sm"
                            >
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <Select onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest')}>
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Sắp xếp theo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sắp xếp theo</SelectLabel>
                                <SelectItem value="newest">Bài mới nhất</SelectItem>
                                <SelectItem value="oldest">Bài cũ nhất</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Tab Tất cả */}
                <TabsContent value="all">
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedBlogs.length > 0 ? (
                            sortedBlogs.map((blog) => <CardNews key={blog.id} blog={blog} />)
                        ) : (
                            <p>Không có blog nào</p>
                        )}
                    </div>
                </TabsContent>

                {/* Các tab danh mục */}
                {categories.map((category) => (
                    <TabsContent key={category.id} value={category.name}>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sortedBlogs.filter((blog) => blog.categoryName === category.name).length > 0 ? (
                                sortedBlogs
                                    .filter((blog) => blog.categoryName === category.name)
                                    .map((blog) => <CardNews key={blog.id} blog={blog} />)
                            ) : (
                                <p>Không có blog nào</p>
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default BlogList;