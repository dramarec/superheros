import React, { useState, useLayoutEffect } from "react";
import { useQuery } from '@apollo/client';
import { SUPERHEROS } from '../../graphql/queries';
import { ISuperheroData, SuperherosVariables } from '../../graphql/types';
import { Layout, Affix, List, Spin } from "antd";
import { SuperheroCard } from './components/SuperheroCard';
import { HeroPagination } from "./components/HeroPagination";

const PAGE_LIMIT = 5;
const { Content } = Layout;

export const Superheros = (): JSX.Element => {
    const [heroPage, setHeroPage] = useState(1);

    const { data, loading, error, refetch } = useQuery<ISuperheroData, SuperherosVariables>(
        SUPERHEROS, {
        variables: {
            limit: PAGE_LIMIT,
            heroPage,
        }
    });

    useLayoutEffect(() => {
        refetch()
    }, [refetch])

    const superheroData = data ? data?.superheros : null;
    const superheros = superheroData?.result

    const superherosList = superheroData?.result.length ? (
        <>
            <Affix offsetTop={64}>
                <HeroPagination
                    total={superheroData?.total}
                    page={heroPage}
                    limit={PAGE_LIMIT}
                    setPage={setHeroPage}
                />
            </Affix>
            <List
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    lg: 4,
                }}
                itemLayout="vertical"

                dataSource={superheros}
                renderItem={(superhero) => (
                    <List.Item>
                        <SuperheroCard superhero={superhero} />
                    </List.Item>
                )}
            />
        </>
    ) : null;


    if (error) {
        return <h2>Uh oh! Something went wrong - please try again later </h2>;
    }


    if (loading) {
        return (
            <Content className="spinner">
                <Spin size="large" tip="Connecting ..." />
            </Content>
        );
    }

    return (
        <>
            {superherosList}
        </>
    )
}
export default Superheros as React.FC