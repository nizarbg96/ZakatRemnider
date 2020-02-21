package smoothalgo.service;

import smoothalgo.domain.Zakat;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Zakat}.
 */
public interface ZakatService {

    /**
     * Save a zakat.
     *
     * @param zakat the entity to save.
     * @return the persisted entity.
     */
    Zakat save(Zakat zakat);

    /**
     * Get all the zakats.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Zakat> findAll(Pageable pageable);
    /**
     * Get all the ZakatDTO where Period is {@code null}.
     *
     * @return the list of entities.
     */
    List<Zakat> findAllWherePeriodIsNull();

    /**
     * Get the "id" zakat.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Zakat> findOne(Long id);

    /**
     * Delete the "id" zakat.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
