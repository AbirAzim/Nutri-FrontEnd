import React from 'react'
import DropdownTwoComponent from '../../../../theme/dropDown/dropdownTwo.component';
import WikiTray from '../wikiTray.component';
import styles from './health.module.scss';

export default function HealthTrayComponent({title}) {
    const options = [
    'systems', 'two', 'three'
    ];
    const systems = [
        'Circulatory',
        'Cardiovascular',
        'Digestive',
        'Excretory',
        'Endocrine',
        'Integumentry',
        'Exocrine',
        'Immune',
        'Lymphatic',
        'Muscular'
    ]
    const defaultOption = options[0];

    const onChange = () => {

    }


    return (
        <WikiTray title={title}>
            <div className={styles.nutrition}>
                <DropdownTwoComponent list={[]} />
                <div>
                    <ul>
                        {
                            systems && systems.map((system, i) => (
                                <li key={system + i}>{system}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </WikiTray>
    )
}
