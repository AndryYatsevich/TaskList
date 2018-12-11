import React from 'react';
import {getCategory, addNewCategory, deleteCategory} from '../../Store/Actions/categoryAction';
import {connect} from 'react-redux';
import style from './style.styl';
import Input from '../../Components/input';
import Button from '../../Components/button';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategoryName: null
        }
    }

    onChangeNewCategoryName = (e) => {
        this.setState({
            newCategoryName: e.target.value
        });
    }

    componentDidMount () {
        this.props.getCategory();
    }

    addNewCategory = () => {
        const newCategory = JSON.stringify({
            name: this.state.newCategoryName
        })
        this.props.addNewCategory(newCategory);
        this.setState({
            newCategoryName: ''
        });
    }

    addNewSubCategory = (e) => {
        const newCategory = JSON.stringify({
            name: 'Тест',
            parentId: Number(e.target.id)
        })
        this.props.addNewCategory(newCategory);
    }

    deleteCategory = (e) => {
        this.props.deleteCategory(e.target.id);
    }

    renderCategory = (array) => {
       if (array) {
            let newArray = [];
            for (let i = 0; i < array.length; i++) {
                if(!array[i].parentId) {
                    newArray.push(array[i]);
                }
                for(let j = 0; j < array.length; j++) {
                    if (array[i].id === array[j].parentId) {
                        newArray.push(array[j]);
                    }
                }
            }
            return this.renderCategoryItem(newArray);
        }
    }

    renderCategoryItem = (array) => array && array.map((el) =>  {        
       return <div className={el.parentId ? style.categoryListSubItem : style.categoryListItem}>
                <div className={style.categoryName}>{el.name}</div>
                <div>    
                    <Button
                        id={el.id} 
                        label={'X'}
                        onClick={(e) => this.deleteCategory(e)}
                    />
                    <Button
                        id={el.id}
                        label={'+'}
                        onClick={(e) => this.addNewSubCategory(e)}
                    />
                </div>
        </div>
    })
    
    render () {
        const {category} = this.props;
        return (
            <div>
                <div className="header">
                    <Input 
                        type="text"
                        placeholder="Название категории"
                        onChange={this.onChangeNewCategoryName}
                        value={this.state.newCategoryName}/>
                    <Button 
                        label={'Add'}
                        onClick={this.addNewCategory}/>
                </div>
                <div className={style.categoryList}>
                    {this.renderCategory(category)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.category
});

export default connect(mapStateToProps, {
    getCategory,
    addNewCategory,
    deleteCategory
})(Category);