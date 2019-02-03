import React from 'react';
import style from '../Conteiners/Categories/style.styl';
import Button from './button';
import Input from './input';

class ModalEditCategory extends React.Component {
    
    render() {
        let currentCategory = this.props.category.filter((el) => el.id == this.props.categoryId);
        return (
            <div>
                {currentCategory && currentCategory.map((el) => {
                    return (<div className={style.modal}>
                            <div className={style.modalCaption}>
                                <h3>Добавление новой подкатегории: </h3>
                            </div>
                            <div className={style.modalBody}>
                                <div className={style.modalItem}>
                                    <Input 
                                        placeholder={'Введите название'}
                                        defaultValue={el.text}
                                        onChange={this.props.onChangeSubCategoryName}/>
                                </div>
                            </div>
                            <div className={style.modalFooter}>
                                <Button 
                                    label={'Добавить'}
                                    onClick={() => this.props.addNewSubCategory()}/>
                            </div>
                        </div>)
                })}
            </div>
            )
    }
}

export default ModalEditCategory;