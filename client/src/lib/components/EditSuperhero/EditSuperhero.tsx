import React from 'react'
import { Redirect, useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import {
    Button, Form, Input, Layout, Spin, Typography
} from "antd";
import { displayErrorMessage, displaySuccessNotification } from '../../utils';

import { UPDATE_SUPERHERO } from "../../graphql/mutation/UpdateSuperhero";
import { SUPERHERO } from '../../graphql/queries/SuperheroById';

const { Content } = Layout;
const { Text, Title } = Typography;

export const EditSuperhero = () => {
    const [form] = Form.useForm();
    const params = useParams<any>()
    const id = params.id

    const {
        data: editSuperhero,
        loading: loadEditSuephero,
        error,
    } = useQuery(SUPERHERO, {
        variables: {
            id,
        }
    })
    const dataHero = editSuperhero.superhero


    const [updateSuperhero, { loading, data }] = useMutation(UPDATE_SUPERHERO, {
        onCompleted: () => {
            displaySuccessNotification("You've successfully updated your Superhero!");
        },
        onError: () => {
            displayErrorMessage(
                "Sorry! We weren't able to update your Superhero. Please try again later"
            );
        },
    })

    const validateMessages = {
        required: 'Please complete all required form fields!',
    };

    const handleUpdateSuperhero = (values: any) => {
        const input = {
            ...values,
        };
        updateSuperhero({
            variables: {
                id,
                input,
            },
        });
    }

    if (loading) {
        return (
            <Content className="load-content">
                <div className="load-header">
                    <Title level={3} className="load-title">
                        Please wait!
                    </Title>
                    <Text type="secondary">We're creating your Superhero now.</Text>
                </div>
            </Content>
        );
    }

    if (data && data.updateSuperhero) {
        return <Redirect to={`/superhero/${data.updateSuperhero.id}`} />;
    }

    if (loadEditSuephero) {
        return (
            <Content className="spinner">
                <Spin size="large" tip="Connecting ..." />
            </Content>
        );
    }

    if (error) {
        return <h2>Uh oh! Something went wrong - please try again later!</h2>;
    }

    return (
        <div className='container__createEditHero'>

            <Content className="load-content">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateSuperhero}
                    validateMessages={validateMessages}
                >
                    <div className="load-header">
                        <Title level={3} className="load-title">
                            Let's create our own Superhero!
                        </Title>
                    </div>

                    <Form.Item
                        label="Nickname"
                        name="nickname"
                        extra="Max character count of 15"
                    >
                        <Input
                            maxLength={15}
                            placeholder="Superman"
                            defaultValue={dataHero.nickname}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Real Name"
                        name="real_name"
                        extra="Max character count of 25"
                    >
                        <Input
                            maxLength={25}
                            placeholder="Clark Kent"
                            defaultValue={dataHero.real_name}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Origin deescription"
                        name="origin_description"
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="he was born Kal-El on the planet Krypton, before being rocketed to
                        Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction..."
                            defaultValue={dataHero.origin_description}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Superpowers"
                        name="superpowers"
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="​solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight..."
                            defaultValue={dataHero.superpowers}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Catch phrase"
                        name="catch_phrase"
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Look, up in the sky, it's a bird, it's a plane, it's Superman!"
                            defaultValue={dataHero.catch_phrase}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="images"
                        extra="Images have to be https://www.mocky.io/v2/"
                    >
                        <Input
                            placeholder="https://www.mocky.io/v2/"
                            defaultValue={dataHero.images}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Form.Item>
                </Form>
            </Content >
        </div>
    )
}
