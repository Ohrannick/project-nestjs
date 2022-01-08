import { NewsEntity } from 'src/news/news.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  // @OneToMany(() => NewsEntity, (news) => news.category)
  // news: NewsEntity[];
}
