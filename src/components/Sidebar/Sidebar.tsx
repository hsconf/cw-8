import { NavLink } from 'react-router-dom';

const categories = [
    { title: 'All', id: '' },
    { title: 'Star Wars', id: 'star-wars' },
    { title: 'Famous people', id: 'famous-people' },
    { title: 'Saying', id: 'saying' },
    { title: 'Humour', id: 'humour' },
    { title: 'Motivational', id: 'motivational' }
];

const Sidebar = () => (
    <aside style={{ marginRight: '150px' }}>
        <ul>
            {categories.map(category => (
                <li key={category.id}>
                    <NavLink
                        to={`/category/${category.id}`}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        {category.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    </aside>
);

export default Sidebar;
