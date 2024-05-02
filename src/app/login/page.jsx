'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLogin, login } from '@/scripts/database/userScripts';
import { Main } from '@/components/boxes/Main';
import { HeaderMenu } from '@/components/menu/HeaderMenu';
import { TextInput } from '@/components/inputs/TextInput';
import { TransparentBox } from '@/components/boxes/TransparentBox';
import { ActionButton } from '@/components/buttons/ActionButton';
import { Form } from '@/components/boxes/Form';

export default function Login(){

    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    console.log(user);

    return(
        <Main>
            <HeaderMenu />
            <TransparentBox>
                <Form>
                    <TextInput 
                        type='email'
                        text={user.email}
                        setText={e => setUser({...user, email: e.target.value})}
                        placeholder='E-Mail'
                    />
                    <TextInput 
                        type='password'
                        text={user.password}
                        setText={e => setUser({...user, password: e.target.value})}
                        placeholder='Senha'
                    />
                    <ActionButton 
                        name='Login'
                        type='submit'
                        width='100%'
                        action={async () => await login(user, router)}
                    />
                </Form>
            </TransparentBox>
        </Main>
    );
}