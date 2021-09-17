import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useHistory } from "react-router-dom";
import { Layout, Typography, Button, Image, Spin } from "antd";
import { SUPERHERO } from '../../graphql/queries/SuperheroById';
import { DELETE_SUPERHERO } from '../../graphql/mutation/DeleteSuperhero';
import { ArrowLeftOutlined, PoweroffOutlined } from '@ant-design/icons';
import { EditSuperhero } from "../EditSuperhero/EditSuperhero";
import { iconColor } from "../../utils";

interface MatchParams {
    id: string;
}

const { Text, Title } = Typography;
const { Content } = Layout;
export const Superhero = () => {
    const [buttonLoading, setButtonLoding] = useState(false)
    const [editSuperhero, setEditSuperhero] = useState(false)

    const { id } = useParams<MatchParams>();
    const history = useHistory();

    const { data, loading, error } = useQuery(SUPERHERO, {
        variables: {
            id,
        }
    })

    const [deleteSuperhero,
        { loading: deleteHeroLoading, error: deleteHeroError }
    ] = useMutation(DELETE_SUPERHERO)

    const handleDeleteHero = async (id: string) => {
        await deleteSuperhero({ variables: { id } })
        setButtonLoding(true)

        let path = `/`;
        history.push(path);
    }

    const goBack = () => {
        let path = `/`;
        history.push(path);
    }

    const superhero = data ? data.superhero : null

    const superheroDetails = superhero ? (
        <div className='superhero'>
            <Image
                width={600}
                src={superhero.images}
            />

            <div className="superhero__details">
                <ul>
                    <li>
                        <Title level={2}>
                            Nickname:  <span>{superhero.nickname}</span>
                        </Title>
                    </li>
                    <li>
                        <Text strong ellipsis className="superhero__title">
                            Real Name:
                            <span>
                                {superhero.real_name}
                            </span>
                        </Text>
                    </li>
                    <li>
                        <Text className="superhero__title">
                            Origin Description:
                            <span>
                                {superhero.origin_description}
                            </span>
                        </Text>
                    </li>
                    <li>
                        <Text className="superhero__title">
                            Superpowers:
                            <span>
                                {superhero.superpowers}
                            </span>
                        </Text>
                    </li>
                    <li>
                        <Text className="superhero__title">
                            Catch Phrase:
                            <span>
                                {superhero.catch_phrase}
                            </span>
                        </Text>
                    </li>
                </ul>
                <Button danger
                    icon={<PoweroffOutlined />}
                    onClick={() => handleDeleteHero(superhero.id)}
                    type="primary"
                    loading={buttonLoading}
                >
                    Delete Superhero
                </Button>
                <Button
                    type="link"
                    onClick={() => setEditSuperhero(true)}
                >
                    Edit Superhero
                </Button>

            </div>
        </div>
    ) : null;

    if (loading) {
        return (
            <Content className="spinner">
                <Spin size="large" tip="Loading Superhero..." />
            </Content>
        );
    }

    if (error) {
        return <h2>Uh oh! Something went wrong - please try again later!</h2>;
    }


    const deleteListingLoadingMessage = deleteHeroLoading ? (
        <h4>Deletion in progress...</h4>
    ) : null;

    const deleteListingErrorMessage = deleteHeroError ? (
        <h4>
            Uh oh! Something went wrong with deleting :. Please try again soon.
        </h4>
    ) : null;

    if (loading) {
        return (
            <Content className="spinner">
                <Spin size="large" tip="Connecting your Stripe account..." />
            </Content>
        );
    }

    return (
        <div className='container__superheroById'>
            <ArrowLeftOutlined className='ArrowLeftOutlined' style={{ color: iconColor, fontSize: 30 }} onClick={goBack} />
            {editSuperhero && <EditSuperhero />}
            {superheroDetails}
            {deleteListingLoadingMessage}
            {deleteListingErrorMessage}
        </div>
    )
};

