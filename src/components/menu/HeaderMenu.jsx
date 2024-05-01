import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useMedia } from '@/hooks/useMedia';
import { icons } from '@/assets/icons';
import { screens } from '@/assets/screens';
import { menuItems } from '@/assets/menuItems';
import { useState } from 'react';

const Styled = styled.header`
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    height: 40px;
    justify-content: space-between;
    padding: 0 100px;
    position: fixed; top: 0;
    width: 100%;
    .qc-logo{
        font-size: 1.8rem;
    }
    nav{
        display: flex;
        gap: 30px;
        ul{
            display: flex;
            gap: 30px;
            list-style: none;
            li:hover{
                color: gray;
                cursor: pointer;
            }
        }
        .hamburger{
            font-size: 1.2rem;
        }
    }
    aside{
        animation: ${props => props.$animation};
        background: #031c23;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed; bottom: 0; top: 50px;
        right: ${props => props.$slide};
        transition: all 0.1s;
        width: 100%;
        ul{
            display: flex;
            flex-direction: column;
            font-size: 1.4rem;
            gap: 10px;
            padding: 20px 40px;
            li{
                align-items: center;
                border-bottom: 1px solid white;
                cursor: pointer;
                display: flex;
                gap: 12px;
                padding: 5px;
            }
        }
    }
    @media(max-width: ${screens.mobile.px}){
        height: 50px;
        padding: 10px 5%;
        .qc-logo{
            font-size: 2rem;
        }
        nav{
            .hamburger{
                font-size: 1.5rem;
            }
        }
    }
`

export function HeaderMenu(){

    const router = useRouter();
    const isMobile = useMedia(screens.mobile.num);

    const [isOpen, setIsOpen] = useState(false);

    return(
        <Styled
            $animation={isOpen ? 'slide 0.2s linear' : 'none'}
            $slide={isOpen ? '0' : '-100%'}
        >
            <icons.nuclear className='qc-logo' 
                onClick={() => router.push(menuItems[0].url)}
            />
            <nav>
                {!isMobile && <ul>
                    {menuItems.map(item => {
                        return(
                            <li onClick={() => {
                                router.push(item.url);
                            }}>
                                {item.name}
                            </li>
                        )
                    })}
                </ul>}
                {isMobile && !isOpen && <icons.menuHamburger 
                    className='hamburger' 
                    onClick={() => setIsOpen(!isOpen)}
                />}
                {isMobile && isOpen && <icons.close 
                    className='hamburger' 
                    onClick={() => setIsOpen(!isOpen)}
                />}
            </nav>
            <aside>
                <ul>
                    {menuItems.map(item => {
                        return(
                            <li key={item.name}
                                onClick={() => router.push(item.url)}
                            >
                                <span>{item.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </aside>
        </Styled>
    );
}